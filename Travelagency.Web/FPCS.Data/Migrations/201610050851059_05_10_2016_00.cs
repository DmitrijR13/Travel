namespace FPCS.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _05_10_2016_00 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EmailInfoes",
                c => new
                    {
                        EmailInfoId = c.Long(nullable: false, identity: true),
                        TypePerson = c.Int(nullable: false),
                        PersonId = c.Long(nullable: false),
                        EmailLetterId = c.Long(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                    })
                .PrimaryKey(t => t.EmailInfoId)
                .ForeignKey("dbo.EmailLetters", t => t.EmailLetterId)
                .Index(t => t.EmailLetterId);
            
            CreateTable(
                "dbo.EmailLetters",
                c => new
                    {
                        EmailLetterId = c.Long(nullable: false, identity: true),
                        Theme = c.String(maxLength: 50),
                        Body = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                    })
                .PrimaryKey(t => t.EmailLetterId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EmailInfoes", "EmailLetterId", "dbo.EmailLetters");
            DropIndex("dbo.EmailInfoes", new[] { "EmailLetterId" });
            DropTable("dbo.EmailLetters");
            DropTable("dbo.EmailInfoes");
        }
    }
}
