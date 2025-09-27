import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Building2, 
  Calendar, 
  FileText,
  MessageSquare,
  Filter,
  MoreHorizontal,
  Eye
} from "lucide-react";
import { toast } from "sonner";

interface StudentRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar?: string;
  requestType: 'application' | 'interview' | 'certificate' | 'recommendation';
  title: string;
  description: string;
  company?: string;
  position?: string;
  submittedDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'rejected';
  documents?: string[];
  deadline?: string;
}

interface MentorApprovalFlowProps {
  requests: StudentRequest[];
  onApprove: (requestIds: string[], comment?: string) => void;
  onReject: (requestIds: string[], reason: string) => void;
  onBulkAction: (action: 'approve' | 'reject', requestIds: string[], comment?: string) => void;
}

export function MentorApprovalFlow({ 
  requests, 
  onApprove, 
  onReject, 
  onBulkAction 
}: MentorApprovalFlowProps) {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [bulkComment, setBulkComment] = useState("");
  const [showBulkActions, setShowBulkActions] = useState(false);

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'application': return <FileText className="w-4 h-4" />;
      case 'interview': return <Calendar className="w-4 h-4" />;
      case 'certificate': return <CheckCircle className="w-4 h-4" />;
      case 'recommendation': return <MessageSquare className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Filter requests
  const filteredRequests = requests.filter(request => {
    const typeMatch = filterType === "all" || request.requestType === filterType;
    const priorityMatch = filterPriority === "all" || request.priority === filterPriority;
    return typeMatch && priorityMatch;
  });

  const pendingRequests = filteredRequests.filter(r => r.status === 'pending');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRequests(pendingRequests.map(r => r.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleSelectRequest = (requestId: string, checked: boolean) => {
    if (checked) {
      setSelectedRequests(prev => [...prev, requestId]);
    } else {
      setSelectedRequests(prev => prev.filter(id => id !== requestId));
    }
  };

  const handleBulkApprove = () => {
    if (selectedRequests.length === 0) {
      toast.error("Please select requests to approve");
      return;
    }
    onBulkAction('approve', selectedRequests, bulkComment);
    setSelectedRequests([]);
    setBulkComment("");
    setShowBulkActions(false);
    toast.success(`${selectedRequests.length} requests approved`);
  };

  const handleBulkReject = () => {
    if (selectedRequests.length === 0) {
      toast.error("Please select requests to reject");
      return;
    }
    if (!bulkComment.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    onBulkAction('reject', selectedRequests, bulkComment);
    setSelectedRequests([]);
    setBulkComment("");
    setShowBulkActions(false);
    toast.success(`${selectedRequests.length} requests rejected`);
  };

  const handleIndividualApprove = (requestId: string) => {
    onApprove([requestId]);
    toast.success("Request approved");
  };

  const handleIndividualReject = (requestId: string, reason: string) => {
    onReject([requestId], reason);
    toast.success("Request rejected");
  };

  return (
    <div className="space-y-6">
      {/* Header with stats and filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Student Requests
              </CardTitle>
              <CardDescription>
                {pendingRequests.length} pending requests require your approval
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{requests.length} total</Badge>
              <Badge variant="secondary">{pendingRequests.length} pending</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="application">Applications</SelectItem>
                <SelectItem value="interview">Interviews</SelectItem>
                <SelectItem value="certificate">Certificates</SelectItem>
                <SelectItem value="recommendation">Recommendations</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Bulk Actions */}
          {pendingRequests.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedRequests.length === pendingRequests.length && pendingRequests.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">
                  {selectedRequests.length > 0 
                    ? `${selectedRequests.length} selected` 
                    : "Select all"
                  }
                </span>
              </div>
              
              {selectedRequests.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBulkActions(!showBulkActions)}
                  >
                    Bulk Actions
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleBulkApprove}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve ({selectedRequests.length})
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowBulkActions(true)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject ({selectedRequests.length})
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Bulk Comment Section */}
          {showBulkActions && selectedRequests.length > 0 && (
            <div className="space-y-3 p-4 border rounded-lg bg-background">
              <h4 className="font-medium">Bulk Action Comment</h4>
              <Textarea
                placeholder="Add a comment for all selected requests..."
                value={bulkComment}
                onChange={(e) => setBulkComment(e.target.value)}
                className="min-h-20"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBulkActions(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleBulkApprove}
                >
                  Approve All
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkReject}
                >
                  Reject All
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className={`${request.priority === 'high' ? 'border-red-200 dark:border-red-800' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Selection checkbox for pending requests */}
                {request.status === 'pending' && (
                  <Checkbox
                    checked={selectedRequests.includes(request.id)}
                    onCheckedChange={(checked) => handleSelectRequest(request.id, checked as boolean)}
                  />
                )}
                
                {/* Student Avatar */}
                <Avatar className="w-12 h-12">
                  <AvatarImage src={request.studentAvatar} alt={request.studentName} />
                  <AvatarFallback>
                    {request.studentName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {/* Request Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getRequestIcon(request.requestType)}
                        <h4 className="font-medium">{request.title}</h4>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        by {request.studentName} • {request.studentEmail}
                      </p>
                      {request.company && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Building2 className="w-3 h-3" />
                          {request.company} - {request.position}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{new Date(request.submittedDate).toLocaleDateString()}</div>
                      {request.deadline && (
                        <div className="text-orange-600">
                          Deadline: {new Date(request.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm">{request.description}</p>
                  
                  {request.documents && request.documents.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {request.documents.map((doc, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Action buttons for pending requests */}
                  {request.status === 'pending' && (
                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleIndividualApprove(request.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const reason = prompt("Please provide a reason for rejection:");
                          if (reason) {
                            handleIndividualReject(request.id, reason);
                          }
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Student
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredRequests.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No requests found</h3>
              <p className="text-muted-foreground">
                No requests match your current filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}