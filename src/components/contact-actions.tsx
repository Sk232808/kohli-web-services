import { Mail, MessageCircle, Phone } from "lucide-react";
import { business, createWhatsAppLink } from "@/config/business";

export function ContactActions({ message, className = "" }: { message: string; className?: string }) {
  return (
    <div className={`contact-actions ${className}`.trim()}>
      <a href={business.phoneLink}><Phone size={14}/>Call Now</a>
      <a href={`mailto:${business.email}`}><Mail size={14}/>Email Us</a>
      <a href={createWhatsAppLink(message)} target="_blank" rel="noreferrer"><MessageCircle size={14}/>Chat on WhatsApp</a>
    </div>
  );
}
