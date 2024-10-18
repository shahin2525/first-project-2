import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public queryModel: Query<T[], T>
  public query: Record<string, unknown>

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel
    this.query = query
  }

  //  search
  search(searchAbleFields: string[]) {
    const searchTerm = this?.query?.searchTerm
    if (searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchAbleFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      })
    }
    return this
  }
  //   filter
  filter() {
    const queryObj = { ...this.query }
    const excludesQuery = ['searchTerm', 'sort', 'limit', 'page', 'fields']
    excludesQuery.forEach((el) => delete queryObj[el])
    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>)
    return this
  }
}
export default QueryBuilder
