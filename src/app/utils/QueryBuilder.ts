/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Query } from 'mongoose';
import { excludeField } from '../constant';

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, string>;
  private filterQuery: Record<string, string> = {};
  private searchQuery: Record<string, any> = {};

  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  /** Apply search on searchable fields (supports _id safely) */
  search(searchableField: string[]): this {
    const searchTerm = this.query.search || '';
    if (!searchTerm) return this;

    const orConditions: any[] = [];

    for (const field of searchableField) {
      // Special case for Mongo ObjectId
      if (field === '_id') {
        if (mongoose.Types.ObjectId.isValid(searchTerm)) {
          orConditions.push({ _id: new mongoose.Types.ObjectId(searchTerm) });
        }
        continue;
      }

      // Normal string field regex search
      orConditions.push({
        [field]: { $regex: searchTerm, $options: 'i' },
      });
    }

    if (orConditions.length === 0) return this;

    this.searchQuery = { $or: orConditions };
    this.modelQuery = this.modelQuery.find(this.searchQuery);

    return this;
  }

  /** Apply filters from query (removes reserved keys) */
  filter(): this {
    const filter: Record<string, string> = { ...this.query };

    for (const field of excludeField) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete filter[field];
    }

    this.filterQuery = filter;
    this.modelQuery = this.modelQuery.find(this.filterQuery);

    return this;
  }

  /** Sorting (supports comma-separated sort like: sort=name,-createdAt) */
  sort(): this {
    const sort = (this.query.sort || '-createdAt').split(',').join(' ');
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  /** Pagination */
  paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  /** Select specific fields */
  fields(): this {
    const fields = this.query.fields?.split(',').join(' ') || '';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  /** Build the query */
  build() {
    return this.modelQuery;
  }

  /** Get meta for pagination */
  async getMeta() {
    const totalDocuments = await this.modelQuery.model.countDocuments({
      ...this.filterQuery,
      ...this.searchQuery,
    });

    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPage = Math.ceil(totalDocuments / limit);

    return { page, limit, total: totalDocuments, totalPage };
  }
}
