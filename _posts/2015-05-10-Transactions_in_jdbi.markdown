---
layout: post
title:  "How to use Transactions in JDBI"
---

I will explain how effectively we can use JDBI for transaction management in this article. JDBI provides easy way to manage to transaction. Just use @Transaction in the method.
Behind scenes, JDBI will be doing begin, commit and rollback. For example.


    public abstract class Dao {

      @SqlUpdate("insert into something values('something')")
      public abstract void saveSomething();

      @SqlUpdate("insert into something_else values('something_else')")
      public abstract void saveSomethingElse();

      @Transaction
      public void insertInTransaction() {
        saveSomething();
        saveSomethingElse();
      }
    }

Here both saveSomething and saveSomethingElse will be in same transaction. This will work when one Dao is involved in transaction.But how to use Transaction when multiple Dao calls needs to be in single transaction.
We can attach all Daos to the same handle. For example,

    public abstract class Dao1 {

      @SqlUpdate("insert into something values('something')")
      public abstract void saveSomething();
    }

    public abstract class Dao2 {

      @SqlUpdate("insert into something_else values('something_else')")
      public abstract void saveSomethingElse();
    }

here we have two Daos. Lets say we want these two inserts to be in same transaction. We need to attach same handle for both the Daos.

    public abstract class Repository implements GetHandle {
      Dao1 dao1 = getHandle().attach(Dao1.class);
      Dao2 dao2 = getHandle().attach(Dao2.class);

      @Transaction
      public void insertInTransaction() {
        dao1.saveSomething();
        dao2.saveSomethingElse();
      }
    }

And make sure that you attach handle to Repository.

    Handle handle =  dbi.open();
    Repository repository = handle.attach(Repository.class);
    repository.insertInTransaction();  // This will be in single transaction.


This will work. But mostly we don't use attach handle to Daos because we don't want to mange open and closing the DBI.
JDBI gives onDemand feature which will obtain and release connection automatically, as it needs to.
When we use Dbi.onDemand to get sqlObject, we should use CreateSqlObject which will make sure that all Daos get same handle.


    public abstract class Repository  {

      @CreateSqlObject
      abstract Dao1 dao1();
      @CreateSqlObject
      abstract Dao2 dao2();

      @Transaction
      public void insertInTransaction() {
        dao1().saveSomething();
        dao2().saveSomethingElse();
      }
    }

    Repository repository = dbi.onDemand(Repository.class);
    repository.insertInTransaction();  // This will be in single transaction.

We can also change TransactionalLevel. Here are the list of transactional level available.

  `READ_UNCOMMITTED`
  `READ_COMMITTED`
  `REPEATABLE_READ`
  `NONE`
  `SERIALIZABLE`


For example, to use READ_UNCOMMITTED level, define Transaction like this,

    @Transaction(TransactionIsolationLevel.READ_UNCOMMITTED)

