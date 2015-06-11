---
layout: post
title:  "Multi tenant applications (Multiple schemas) in JDBI"
---

Having multiple databases or multiple schemas with identical table structure in multi tenant application is common. It is pain, if you need to specify the schema whenever you access the database in multi schema environment. I'll describe here how can we use JDBI in multiple schema database environment.

Ideal way to do this is, capture the schema related information from request and save it in ThreadLocal and set the schema whenever the connection is requested.
Unfortunately when I tried this approach, I found setSchema method is not yet implemented in drivers. But I found another way(hack) to solve this.
JDBI provides statement Locator which we can use here to solve this problem.

Lets say we are sending schema name in query Parameter, we can use jersey request filter to get schema name.

    public class Schema {
        public static ThreadLocal<String> name = new ThreadLocal<>();
    }


    public class SchemaNameFilter implements ContainerRequestFilter {

        @Override
        public ContainerRequest filter(ContainerRequest request) {
            if(request.getQueryParameters().containsKey("schema")) {
                Schema.name.set(request.getQueryParameters().get("schema").get(0));
            }
            return request;
        }
    }

This will get the schema name on every request. Register this filer on your application bootstrap.

    environment.jersey().property(ResourceConfig.PROPERTY_CONTAINER_REQUEST_FILTERS, asList(new SchemaNameFilter()));

Now we need to write the second part, where we should use this schema information. Include this SchemaRewriter,

    public class SchemaReWriter implements StatementLocator {
        @Override
        public String locate(String sql, StatementContext ctx) throws Exception {
            if (nonNull(Schema.name.get())) {
                sql = sql.replaceAll(":schema", Schema.name.get());
            }
            return sql;
        }
    }

Lets say we want to access the table "users" which is in all the schemas, write query like this.

    @OverrideStatementLocatorWith(SchemaReWriter.class)
    public interface UserDao {

      @SqlQuery("select * from :schema.users")
      public List<User> getAllUsers();

    }

Don't forget to annotate Dao with StatementRewriter. That's all. You don't need to worry about multiple schemas.



