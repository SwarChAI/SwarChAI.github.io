import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useSessions } from "@/contexts/SessionContext";
import { useNavigate } from "react-router-dom";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: {
    id?: string;
    name: string;
    role: string;
    company: string;
    image: string;
    specialty: string;
  };
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export function BookingModal({ isOpen, onClose, mentor }: BookingModalProps) {
  const { isAuthenticated, user } = useAuth();
  const { addSession } = useSessions();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please sign in to request a session.",
        variant: "destructive",
      });
      onClose();
      navigate("/auth");
      return;
    }

    if (!date || !selectedTime || !topic.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a date, time, and enter a topic.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add session to context
    addSession({
      mentorId: mentor.id || mentor.name.toLowerCase().replace(/\s+/g, '-'),
      mentorName: mentor.name,
      mentorRole: mentor.role,
      mentorCompany: mentor.company,
      mentorImage: mentor.image,
      mentorSpecialty: mentor.specialty,
      menteeId: user?.id?.toString() || 'demo-user',
      menteeName: user?.name || 'Demo User',
      menteeEmail: user?.email || 'demo@example.com',
      date: format(date, 'yyyy-MM-dd'),
      time: selectedTime,
      topic: topic.trim(),
      message: message.trim() || undefined,
    });

    toast({
      title: "Session requested!",
      description: `Your session request with ${mentor.name} has been sent. Check your dashboard for updates.`,
    });

    setIsSubmitting(false);
    setDate(undefined);
    setSelectedTime(undefined);
    setTopic("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Request a Session</DialogTitle>
        </DialogHeader>

        {/* Mentor Info */}
        <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
          <img
            src={mentor.image}
            alt={mentor.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div>
            <h3 className="font-display text-lg text-foreground">{mentor.name}</h3>
            <p className="text-sm text-muted-foreground">
              {mentor.role} at {mentor.company}
            </p>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {mentor.specialty}
            </span>
          </div>
        </div>

        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Select Date *</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date < new Date() || date.getDay() === 0 || date.getDay() === 6
                }
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Select Time *</label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  selectedTime === time
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                )}
              >
                <Clock className="h-3 w-3" />
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Topic */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Session Topic *</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Career transition advice, Resume review"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Additional Message <span className="text-muted-foreground">(optional)</span>
          </label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share any specific questions or context for the session..."
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="hero"
            className="flex-1"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Request Session"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}