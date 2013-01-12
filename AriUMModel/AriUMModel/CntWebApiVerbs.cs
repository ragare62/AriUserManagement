using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AriUMModel
{
    public  partial class CntWebApiVerbs:IWebApiVerbs
    {
        #region User
        public  IList<User> GetUsers(AriUMContext ctx)
        {
            return (from u in ctx.Users
                    select u).ToList<User>();
        }

        public  User GetUser(int id, AriUMContext ctx)
        {
            return (from u in ctx.Users
                    where u.UserId == id
                    select u).FirstOrDefault<User>();
        }

        public  User PostUser(User user, AriUMContext ctx)
        {
            ctx.Add(user);
            ctx.SaveChanges();
            return user;
        }

        public  User PutUser(User user, AriUMContext ctx)
        {
            ctx.SaveChanges();
            return user;
        }

        public  bool DeleteUser(User user, AriUMContext ctx)
        {
            ctx.Delete(user);
            ctx.SaveChanges();
            return true;
        }
        #endregion 

        #region UserGroup
        public  IList<UserGroup> GetUserGroups(AriUMContext ctx)
        {
            return (from uG in ctx.UserGroups
                    select uG).ToList<UserGroup>();
        }

        public  UserGroup GetUserGroup(int id, AriUMContext ctx)
        {
            return (from uG in ctx.UserGroups
                    where uG.UserGroupId == id
                    select uG).FirstOrDefault<UserGroup>();
        }

        public  UserGroup PostUserGroup(UserGroup userGroup, AriUMContext ctx)
        {
            ctx.Add(userGroup);
            ctx.SaveChanges();
            return userGroup;
        }

        public  UserGroup PutUserGroup(UserGroup userGroup, AriUMContext ctx)
        {
            ctx.SaveChanges();
            return userGroup;
        }

        public  bool DeleteUserGroup(UserGroup userGroup, AriUMContext ctx)
        {
            ctx.Delete(userGroup);
            ctx.SaveChanges();
            return true;
        }
        #endregion 
    }
}
