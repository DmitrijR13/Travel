namespace FPCS.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _13_10_2016_01 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.IncomingMessageJournals",
                c => new
                    {
                        IncomingMessageJournalId = c.Long(nullable: false, identity: true),
                        Date = c.DateTimeOffset(nullable: false, precision: 7),
                        PersonId = c.Long(nullable: false),
                        RequestContent = c.String(maxLength: 500),
                        AcceptedById = c.Long(nullable: false),
                        ResponsibleId = c.Long(nullable: false),
                        IncomingSource = c.Int(nullable: false),
                        Result = c.String(maxLength: 500),
                        SourceInfo = c.Int(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                    })
                .PrimaryKey(t => t.IncomingMessageJournalId)
                .ForeignKey("dbo.Workers", t => t.AcceptedById)
                .ForeignKey("dbo.People", t => t.PersonId)
                .ForeignKey("dbo.Workers", t => t.ResponsibleId)
                .Index(t => t.PersonId)
                .Index(t => t.AcceptedById)
                .Index(t => t.ResponsibleId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.IncomingMessageJournals", "ResponsibleId", "dbo.Workers");
            DropForeignKey("dbo.IncomingMessageJournals", "PersonId", "dbo.People");
            DropForeignKey("dbo.IncomingMessageJournals", "AcceptedById", "dbo.Workers");
            DropIndex("dbo.IncomingMessageJournals", new[] { "ResponsibleId" });
            DropIndex("dbo.IncomingMessageJournals", new[] { "AcceptedById" });
            DropIndex("dbo.IncomingMessageJournals", new[] { "PersonId" });
            DropTable("dbo.IncomingMessageJournals");
        }
    }
}
