namespace FPCS.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _20160923_FirstMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FisicalPersons",
                c => new
                    {
                        PersonId = c.Long(nullable: false, identity: true),
                        FIO = c.String(maxLength: 100),
                        CellPhone = c.String(maxLength: 20),
                        Phone = c.String(maxLength: 20),
                        FieldOfActivity = c.String(maxLength: 100),
                        Email = c.String(maxLength: 100),
                        WayOfInform = c.Int(nullable: false),
                        DateOfBirth = c.DateTimeOffset(nullable: false, precision: 7),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                    })
                .PrimaryKey(t => t.PersonId);
            
            CreateTable(
                "dbo.Admin",
                c => new
                    {
                        DbUserId = c.Guid(nullable: false, identity: true),
                        UnqDbUserId = c.Guid(nullable: false),
                        Login = c.String(nullable: false, maxLength: 100),
                        Password = c.String(nullable: false, maxLength: 100),
                        Email = c.String(maxLength: 100),
                        FirstName = c.String(nullable: false, maxLength: 100),
                        LastName = c.String(nullable: false, maxLength: 100),
                        FullName = c.String(nullable: false, maxLength: 200),
                        MiddleInitial = c.String(maxLength: 50),
                        IsLocked = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                        Role = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.DbUserId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Admin");
            DropTable("dbo.FisicalPersons");
        }
    }
}
