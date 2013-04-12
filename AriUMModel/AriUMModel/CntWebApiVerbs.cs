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

        #region Customer
        public static IList<Customer> GetCustomers(AriUMContext ctx)
        {
            return (from uG in ctx.Customers
                    select uG).ToList<Customer>();
        }

        public static Customer GetCustomer(int id, AriUMContext ctx)
        {
            return (from uG in ctx.Customers
                    where uG.CustomerId == id
                    select uG).FirstOrDefault<Customer>();
        }

        public static Customer PostCustomer(Customer customer, AriUMContext ctx)
        {
            ctx.Add(customer);
            ctx.SaveChanges();
            return customer;
        }

        public static Customer PutCustomer(Customer customer, AriUMContext ctx)
        {
            ctx.AttachCopy<Customer>(customer);
            ctx.SaveChanges();
            return customer;
        }

        public static bool DeleteCustomer(Customer customer, AriUMContext ctx)
        {
            ctx.Delete(customer);
            ctx.SaveChanges();
            return true;
        }
        #endregion 

        #region Product
        public static IList<Product> GetProducts(AriUMContext ctx)
        {
            return (from p in ctx.Products
                    select p).ToList<Product>();
        }

        public static Product GetProduct(int id, AriUMContext ctx)
        {
            return (from p in ctx.Products
                    where p.ProductId == id
                    select p).FirstOrDefault<Product>();
        }

        public static Product PostProduct(Product product, AriUMContext ctx)
        {
            ctx.Add(product);
            ctx.SaveChanges();
            return product;
        }

        public static Product PutProduct(Product product, AriUMContext ctx)
        {
            ctx.AttachCopy<Product>(product);
            ctx.SaveChanges();
            return product;
        }

        public static bool DeleteProduct(Product product, AriUMContext ctx)
        {
            ctx.Delete(product);
            ctx.SaveChanges();
            return true;
        }
        #endregion 
    }
}
