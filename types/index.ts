interface Tenant {
    id: string;
    name: string;
    domain: string;
}
  
interface User {
    id: string;
    email: string;
    username: string;
	tenantId: string;
}
