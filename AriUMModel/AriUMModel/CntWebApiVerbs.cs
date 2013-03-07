using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AriUMModel
{
    public static  partial class CntWebApiVerbs
    {
        #region User
        public static  IList<User> GetUsers(AriUMContext ctx)
        {
            return (from u in ctx.Users
                    select u).ToList<User>();
        }

        public static  User GetUser(int id, AriUMContext ctx)
        {
            return (from u in ctx.Users
                    where u.UserId == id
                    select u).FirstOrDefault<User>();
        }

        public static  User PostUser(User user, AriUMContext ctx)
        {
            ctx.Add(user);
            ctx.SaveChanges();
            return user;
        }

        public static  User PutUser(User user, AriUMContext ctx)
        {
            ctx.AttachCopy<User>(user);
            ctx.SaveChanges();
            return user;
        }

        public static  bool DeleteUser(User user, AriUMContext ctx)
        {
            ctx.Delete(user);
            ctx.SaveChanges();
            return true;
        }
        #endregion 

        #region UserGroup
        public static  IList<UserGroup> GetUserGroups(AriUMContext ctx)
        {
            return (from uG in ctx.UserGroups
                    select uG).ToList<UserGroup>();
        }

        public static  UserGroup GetUserGroup(int id, AriUMContext ctx)
        {
            return (from uG in ctx.UserGroups
                    where uG.UserGroupId == id
                    select uG).FirstOrDefault<UserGroup>();
        }

        public static  UserGroup PostUserGroup(UserGroup userGroup, AriUMContext ctx)
        {
            ctx.Add(userGroup);
            ctx.SaveChanges();
            return userGroup;
        }

        public static  UserGroup PutUserGroup(UserGroup userGroup, AriUMContext ctx)
        {
            ctx.AttachCopy<UserGroup>(userGroup);
            ctx.SaveChanges();
            return userGroup;
        }

        public static  bool DeleteUserGroup(UserGroup userGroup, AriUMContext ctx)
        {
            ctx.Delete(userGroup);
            ctx.SaveChanges();
            return true;
        }
        #endregion 
    }
}
