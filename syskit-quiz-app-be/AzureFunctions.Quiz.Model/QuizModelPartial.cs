using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctions.Quiz.Model
{
    [DbConfigurationType(typeof(myDBContextConfig))]
    partial class QuizContext
    {

        public QuizContext(string connectionString) : base(connectionString)
        {
        }
    }

    public class myDBContextConfig : DbConfiguration
    {
        public myDBContextConfig()
        {
            SetProviderServices("System.Data.EntityClient",SqlProviderServices.Instance);
        }
    }
}
