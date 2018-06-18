using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Coupon.Data.Utils
{
    public interface IRawSqlQuery
    {
        Task<List<TRes>> GetResults<TRes>(string sql, Func<SqlDataReader, TRes> mapper);
    }
}
