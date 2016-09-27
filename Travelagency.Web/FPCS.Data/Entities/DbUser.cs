using System;
using FPCS.Data.Enums;
using System.Collections.Generic;

namespace FPCS.Data.Entities
{
	public abstract class DbUser
	{
		public Guid DbUserId { get; set; }

		public Guid UnqDbUserId { get; set; }

		public String Login { get; set; }

		public String Password { get; set; }

		public String Email { get; set; }

		public String FirstName { get; set; }

		public String LastName { get; set; }

		public String FullName { get; set; }

		public String MiddleInitial { get; set; }

		public Boolean IsLocked { get; set; }

		public Boolean IsDeleted { get; set; }

		public DateTimeOffset CreatedDate { get; set; }

		public DateTimeOffset UpdatedDate { get; set; }

		public Role Role { get; set; }
	}
}
