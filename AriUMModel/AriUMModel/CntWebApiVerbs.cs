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
            // Password control
            if (user.Password != "" && user.Password != null)
            {
                user.Password = CntWebApiSecurity.GetHashCode(user.Password);
            }
            ctx.Add(user);
            ctx.SaveChanges();
            return user;
        }

        public static  User PutUser(User user, AriUMContext ctx)
        {
            // Password control
            if (user.Password != "" && user.Password != null)
            {
                user.Password = CntWebApiSecurity.GetHashCode(user.Password);
            }
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

        #region Invoice
        public static IList<Invoice> GetInvoices(AriUMContext ctx)
        {
            return (from i in ctx.Invoices
                    select i).ToList<Invoice>();
        }

        public static Invoice GetInvoice(int id, AriUMContext ctx)
        {
            return (from p in ctx.Invoices
                    where p.InvoiceId == id
                    select p).FirstOrDefault<Invoice>();
        }

        public static Invoice PostInvoice(Invoice invoice, AriUMContext ctx)
        {
            ctx.Add(invoice);
            ctx.SaveChanges();
            return invoice;
        }

        public static Invoice PutInvoice(Invoice invoice, AriUMContext ctx)
        {
            //Customer c = invoice.Customer;
            //invoice.Customer = null;
            //ctx.AttachCopy<Invoice>(invoice);
            //invoice.Customer = c;
            int customerId = 0;
            int invoiceId = invoice.InvoiceId;
            if (invoice.Customer != null)
            {
                customerId = invoice.Customer.CustomerId;
                invoice.Customer = null;
            }
            ctx.AttachCopy <Invoice>(invoice);
            if (customerId != 0)
            {
                invoice = (from i in ctx.Invoices
                           where i.InvoiceId == invoiceId
                           select i).FirstOrDefault<Invoice>();
                invoice.Customer = (from cus in ctx.Customers
                                    where cus.CustomerId == customerId
                                    select cus).FirstOrDefault<Customer>();
            }
            ctx.SaveChanges();
            return invoice;
        }

        public static bool DeleteInvoice(Invoice invoice, AriUMContext ctx)
        {
            ctx.Delete(invoice);
            ctx.SaveChanges();
            return true;
        }
        #endregion 

        #region InvoiceLine
        public static IList<InvoiceLine> GetInvoiceLines(AriUMContext ctx)
        {
            return (from il in ctx.InvoiceLines
                    select il).ToList<InvoiceLine>();
        }

        public static InvoiceLine GetInvoiceLine(int id, AriUMContext ctx)
        {
            return (from p in ctx.InvoiceLines
                    where p.InvoiceLineId == id
                    select p).FirstOrDefault<InvoiceLine>();
        }

        public static InvoiceLine PostInvoiceLine(InvoiceLine invoiceLine, AriUMContext ctx)
        {
            if (invoiceLine.Invoice != null)
            {
                Invoice invoice = (from i in ctx.Invoices
                                   where i.InvoiceId == invoiceLine.Invoice.InvoiceId
                                   select i).FirstOrDefault<Invoice>();
                invoiceLine.Invoice = invoice;
            }
            if (invoiceLine.Product != null)
            {
                Product product = (from p in ctx.Products
                                   where p.ProductId == invoiceLine.Product.ProductId
                                   select p).FirstOrDefault<Product>();
                invoiceLine.Product = product;
            }
            ctx.Add(invoiceLine);
            ctx.SaveChanges();
            return invoiceLine;
        }

        public static InvoiceLine PutInvoiceLine(InvoiceLine invoiceLine, AriUMContext ctx)
        {
            int invoiceLineId = invoiceLine.InvoiceLineId;
            int productId = 0;
            int invoiceId = 0;
            if (invoiceLine.Product != null)
            {
                productId = invoiceLine.Product.ProductId;
                invoiceLine.Product = null;
            }
            if (invoiceLine.Invoice != null)
            {
                invoiceId = invoiceLine.Invoice.InvoiceId;
                invoiceLine.Invoice = null;
            }
            ctx.AttachCopy<InvoiceLine>(invoiceLine);
            invoiceLine = (from il in ctx.InvoiceLines
                           where il.InvoiceLineId == invoiceLineId
                           select il).FirstOrDefault<InvoiceLine>();
            invoiceLine.Product = (from p in ctx.Products
                                   where p.ProductId == productId
                                   select p).FirstOrDefault<Product>();
            invoiceLine.Invoice = (from i in ctx.Invoices
                                   where i.InvoiceId == invoiceId
                                   select i).FirstOrDefault<Invoice>();
            ctx.SaveChanges();
            return invoiceLine;
        }

        public static bool DeleteInvoiceLine(InvoiceLine invoiceLine, AriUMContext ctx)
        {
            ctx.Delete(invoiceLine);
            ctx.SaveChanges();
            return true;
        }
        #endregion 
    }
}
