using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AriUMModel
{
    public interface IContext
    {
        AriUMContext GetContext(string connection);
        void CloseContext(AriUMContext ctx);
    }
}
