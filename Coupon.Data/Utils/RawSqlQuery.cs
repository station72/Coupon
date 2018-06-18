using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Coupon.Data.Utils
{
    public class RawSqlQuery : IRawSqlQuery
    {
        private readonly IConfiguration _config;

        public RawSqlQuery(IConfiguration config)
        {
            _config = config;
        }

        public async Task<List<TRes>> GetResults<TRes>(string sql, Func<SqlDataReader, TRes> mapper)
        {
            using (var sqlConnect = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await sqlConnect.OpenAsync();
                using (var sqlCmd = new SqlCommand(sql, sqlConnect))
                {
                    using (var sqlReader = await sqlCmd.ExecuteReaderAsync())
                    {
                        var result = new List<TRes>();
                        if (sqlReader.HasRows)
                        {
                            while (await sqlReader.ReadAsync())
                            {
                                result.Add(mapper(sqlReader));
                            }
                        }
                        return result;
                    }
                }
            }
        }
    }
}
