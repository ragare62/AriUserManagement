using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AriUMModel
{
    public class CntContext:IContext
    {
        public  AriUMContext GetContext(string connection)
        {
            return new AriUMContext(connection);
        }

        public  void CloseContext(AriUMContext ctx)
        {
            ctx.Dispose();
        }
    }
}
