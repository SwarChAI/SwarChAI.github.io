import { Layout } from "@/components/layout/Layout";
import { Shield, Lock, Eye, Database, Share2, Trash2 } from "lucide-react";

const sections = [
  {
    id: "information-collection",
    title: "Information We Collect",
    icon: Database,
    content: [
      {
        subtitle: "Personal Information",
        text: "When you create an account, we collect your name, email address, and professional background information. For mentors, this includes your current role, company, and areas of expertise.",
      },
      {
        subtitle: "Profile Information",
        text: "Information you choose to share in your profile, including your bio, career goals, interests, and profile photo.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you use our platform, including pages visited, features used, and session duration.",
      },
      {
        subtitle: "Communication Data",
        text: "Messages exchanged between mentors and mentees on our platform, session notes, and feedback provided.",
      },
    ],
  },
  {
    id: "information-use",
    title: "How We Use Your Information",
    icon: Eye,
    content: [
      {
        subtitle: "Matching & Recommendations",
        text: "We use your profile information and preferences to match you with suitable mentors or mentees and provide personalized recommendations.",
      },
      {
        subtitle: "Platform Improvement",
        text: "Usage data helps us understand how to improve our platform, develop new features, and enhance user experience.",
      },
      {
        subtitle: "Communication",
        text: "We may send you service-related emails, including session reminders, platform updates, and important announcements.",
      },
      {
        subtitle: "AI Features",
        text: "With your consent, we use AI to analyze your goals and progress to provide better matching and personalized insights.",
      },
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    icon: Share2,
    content: [
      {
        subtitle: "With Other Users",
        text: "Your public profile information is visible to other users of the platform. You control what information appears on your profile.",
      },
      {
        subtitle: "Service Providers",
        text: "We work with third-party service providers who help us operate our platform. These providers are contractually obligated to protect your information.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose information if required by law, court order, or government request, or to protect the rights and safety of our users.",
      },
      {
        subtitle: "Business Transfers",
        text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.",
      },
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Lock,
    content: [
      {
        subtitle: "Encryption",
        text: "All data transmitted to and from our platform is encrypted using industry-standard SSL/TLS protocols.",
      },
      {
        subtitle: "Access Controls",
        text: "We implement strict access controls to ensure only authorized personnel can access user data, and only when necessary.",
      },
      {
        subtitle: "Regular Audits",
        text: "We conduct regular security audits and vulnerability assessments to identify and address potential security risks.",
      },
      {
        subtitle: "Incident Response",
        text: "We have established procedures to respond to security incidents and will notify affected users as required by law.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: Shield,
    content: [
      {
        subtitle: "Access & Portability",
        text: "You can request a copy of your personal data at any time. We'll provide it in a commonly used, machine-readable format.",
      },
      {
        subtitle: "Correction",
        text: "You can update or correct your personal information through your account settings or by contacting us.",
      },
      {
        subtitle: "Deletion",
        text: "You can request deletion of your account and personal data. Some information may be retained as required by law.",
      },
      {
        subtitle: "Opt-Out",
        text: "You can opt out of marketing communications at any time. You can also adjust your privacy settings in your account.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    icon: Trash2,
    content: [
      {
        subtitle: "Active Accounts",
        text: "We retain your data for as long as your account is active and you continue to use our services.",
      },
      {
        subtitle: "Deleted Accounts",
        text: "When you delete your account, we remove your personal data within 30 days, except where retention is required by law.",
      },
      {
        subtitle: "Anonymized Data",
        text: "We may retain anonymized, aggregated data that cannot be used to identify you for analytics and research purposes.",
      },
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Shield className="h-4 w-4" />
              Your Privacy Matters
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-6">
              Privacy <span className="text-primary italic">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're committed to protecting your privacy and being transparent about how we handle your data.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: December 15, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-display text-foreground mb-4">Quick Navigation</h2>
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-16">
            {sections.map((section, index) => (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display text-foreground">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-6 pl-16">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-display text-foreground mb-4">
              Questions About Our Privacy Practices?
            </h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions or concerns about our privacy policy or how we handle your data, 
              please don't hesitate to reach out.
            </p>
            <div className="space-y-2">
              <p className="text-foreground">
                <strong>Email:</strong>{" "}
                <a href="mailto:privacy@swarchai.com" className="text-primary hover:underline">
                  privacy@swarchai.com
                </a>
              </p>
              <p className="text-foreground">
                <strong>Address:</strong> 123 Innovation Way, San Francisco, CA 94105
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
