
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Mail, Phone, Users } from "lucide-react";

const Parents = () => {
  // Mock data for parents
  const parents = [
    {
      id: 1,
      name: "Robert & Mary Doe",
      children: ["John Doe"],
      email: "robertdoe@email.com",
      phone: "+254-700-111222",
      address: "123 Riverside Drive, Nairobi",
      occupation: "Software Engineer & Teacher"
    },
    {
      id: 2,
      name: "Michael & Sarah Smith",
      children: ["Jane Smith", "Thomas Smith"],
      email: "msmith@email.com",
      phone: "+254-700-222333",
      address: "456 Kenyatta Avenue, Nairobi",
      occupation: "Doctor & Accountant"
    },
    {
      id: 3,
      name: "James & Lisa Johnson",
      children: ["David Johnson"],
      email: "jjohnson@email.com",
      phone: "+254-700-333444",
      address: "789 Mombasa Road, Nairobi",
      occupation: "Business Owner & Marketing Executive"
    },
    {
      id: 4,
      name: "Richard & Patricia Williams",
      children: ["Emily Williams", "Daniel Williams"],
      email: "rwilliams@email.com",
      phone: "+254-700-444555",
      address: "321 Ngong Road, Nairobi",
      occupation: "Architect & Interior Designer"
    },
    {
      id: 5,
      name: "Thomas & Jennifer Brown",
      children: ["Kevin Brown"],
      email: "tbrown@email.com",
      phone: "+254-700-555666",
      address: "654 Waiyaki Way, Nairobi",
      occupation: "University Professor & Researcher"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Parents</h2>
          <p className="text-gray-600">Manage parent information and communication</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Parent
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input type="text" placeholder="Search parents by name, email, or student..." className="pl-9" />
      </div>

      {/* Parents list */}
      <div className="grid gap-4">
        {parents.map((parent) => (
          <Card key={parent.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="font-medium text-lg">{parent.name}</h3>
                  
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <span>Children: {parent.children.join(", ")}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{parent.email}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{parent.phone}</span>
                    </div>
                    
                    <p>Address: {parent.address}</p>
                    <p>Occupation: {parent.occupation}</p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Send Message</Button>
                  <Button variant="outline" size="sm">Schedule Meeting</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Parents;
