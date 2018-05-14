using AzureFunctions.Quiz.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctions.Quiz.App.Utils
{
    public class DbContextFactory
    {
        private static DbContextFactory _instance;
        public static DbContextFactory Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new DbContextFactory();
                }

                return _instance;
            }
        }

        public QuizContext Context => new QuizContext(_efConnectionString);

        private string _sqlConnectionString;
        private string _efConnectionString;
        
        protected DbContextFactory()
        {
            setUpConnectionStrings();
        }

        /// <summary>
        /// Sets connection strings for database from settings that are used for creating EF context
        /// </summary>
        private void setUpConnectionStrings()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

            EntityConnectionStringBuilder efBuilder;
            // ef connection string
            if (connectionString.ToLower().StartsWith("metadata="))
            {
                efBuilder = new EntityConnectionStringBuilder(connectionString);
            }
            else
            {
                // ado.net connection string
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder(connectionString);
                efBuilder = new EntityConnectionStringBuilder()
                {
                    Provider = "System.Data.SqlClient",
                    Metadata = @"res://*/",
                    ProviderConnectionString = builder.ToString()
                };
            }

            _sqlConnectionString = efBuilder.ProviderConnectionString;
            _efConnectionString = efBuilder.ToString();
        }
    }
}
