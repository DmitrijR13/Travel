using System;
using FPCS.Data.Enums;
using System.Collections.Generic;

namespace FPCS.Data.Entities
{
	public abstract class DbUser :BaseEntity
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

		public Role Role { get; set; }
	}
}
