import QueryBuilder from '../../builder/QueryBuilder'
import { AdminSearchableFields } from './admin.constant'

import Admin from './admin.model'

const getAllAdmin = async (query: Record<string, unknown>) => {
  const adminBuilder = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await adminBuilder.queryModel
  return result
}

export const FacultyServices = {
  getAllAdmin,
}
