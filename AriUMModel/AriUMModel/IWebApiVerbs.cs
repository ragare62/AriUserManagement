using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AriUMModel
{
    public interface IWebApiVerbs
    {
        #region User
        IList<User> GetUsers(AriUMContext ctx);
        User GetUser(int id, AriUMContext ctx);
        User PostUser(User user, AriUMContext ctx);
        User PutUser(User user, AriUMContext ctx);
        bool DeleteUser(User user, AriUMContext ctx);
        #endregion 

        #region UserGroup
        IList<UserGroup> GetUserGroups(AriUMContext ctx);
        UserGroup GetUserGroup(int id, AriUMContext ctx);
        UserGroup PostUserGroup(UserGroup userGroup, AriUMContext ctx);
        UserGroup PutUserGroup(UserGroup userGroup, AriUMContext ctx);
        bool DeleteUserGroup(UserGroup userGroup, AriUMContext ctx);
        #endregion

    }
}