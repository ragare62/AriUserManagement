using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AriUMModel;

namespace AriUMConsole
{
    public static class CntConsole
    {
        public static void CreateDefaultRegisters()
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                // Some registers to start
                UserGroup usp = new UserGroup() { 
                    Name="Technical staff"
                };
                CntWebApiVerbs.PostUserGroup(usp, ctx);
                User u = new User()
                {
                    Name = "John Doe",
                    Email = "johndoe@arium.com"
                };
                u.UserGroup = usp;
                CntWebApiVerbs.PostUser(u, ctx);
                u = new User()
                {
                    Name="Martha Graham",
                    Email="marthag@arium.com"
                };
                u.UserGroup = usp;
                CntWebApiVerbs.PostUser(u, ctx);
            }
        }
    }
}
