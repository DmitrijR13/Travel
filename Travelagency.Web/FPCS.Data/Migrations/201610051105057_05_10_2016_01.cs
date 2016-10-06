namespace FPCS.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _05_10_2016_01 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.FisicalPersons", newName: "People");
            AddColumn("dbo.People", "TypePerson", c => c.Int(nullable: false));
            CreateIndex("dbo.EmailInfoes", "PersonId");
            AddForeignKey("dbo.EmailInfoes", "PersonId", "dbo.People", "PersonId");
            DropColumn("dbo.EmailInfoes", "TypePerson");
        }
        
        public override void Down()
        {
            AddColumn("dbo.EmailInfoes", "TypePerson", c => c.Int(nullable: false));
            DropForeignKey("dbo.EmailInfoes", "PersonId", "dbo.People");
            DropIndex("dbo.EmailInfoes", new[] { "PersonId" });
            DropColumn("dbo.People", "TypePerson");
            RenameTable(name: "dbo.People", newName: "FisicalPersons");
        }
    }
}
