namespace FPCS.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _13_10_2016_00 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.People", "TypeFiz", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.People", "TypeFiz");
        }
    }
}
