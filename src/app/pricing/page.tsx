"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BarChart3, Check, CreditCard, FileText, HelpCircle, ShieldCheck, Sparkles, Users, X } from "lucide-react";
import { PublicNav } from "@/components/layout/PublicNav";
import styles from "./pricing.module.css";

const plans = [
  {
    id: "starter",
    name: "Starter",
    monthly: "₦50,000",
    annual: "₦500,000",
    annualNote: "Save ₦100,000 yearly",
    description: "For agents, small teams, and businesses launching professional campaign pages.",
    limit: "50 active listings",
    highlighted: false,
    features: ["Campaign pages", "Lead capture", "Basic analytics", "Multi-channel sharing", "Marketing copy generator"],
    unavailable: ["Team access", "Advanced reports", "API access"]
  },
  {
    id: "professional",
    name: "Professional",
    monthly: "₦100,000",
    annual: "₦1,000,000",
    annualNote: "Save ₦200,000 yearly",
    description: "For growing listing teams that need advanced analytics, reports, and collaboration.",
    limit: "500 active listings",
    highlighted: true,
    features: ["Advanced analytics", "Team access", "Marketing reports", "Priority support", "Landlord performance reports", "Lead status pipeline"],
    unavailable: ["White-label access", "API access"]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: "₦250,000",
    annual: "₦2,500,000",
    annualNote: "Save ₦500,000 yearly",
    description: "For agencies, franchises, and high-volume businesses that need scale and control.",
    limit: "Unlimited listings",
    highlighted: false,
    features: ["Unlimited team members", "White-label access", "API access", "Dedicated support", "Client-ready reports", "Enterprise controls"],
    unavailable: []
  }
];

const comparison = [
  ["Active listings", "50", "500", "Unlimited"],
  ["Campaign pages", "Included", "Included", "Included"],
  ["Lead capture", "Included", "Included", "Included"],
  ["Analytics", "Basic", "Advanced", "Advanced"],
  ["Team members", "Owner only", "Included", "Unlimited"],
  ["Marketing reports", "Basic", "Included", "Included"],
  ["White-label access", "No", "No", "Included"],
  ["API access", "No", "No", "Included"]
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer: "Yes. You can upgrade as your listing volume grows, and ListingJet keeps your workspace, listings, leads, and analytics connected."
  },
  {
    question: "What counts as an active listing?",
    answer: "An active listing is a published campaign page that is visible to visitors. Draft, paused, and archived listings do not count against active plan limits."
  },
  {
    question: "Do annual plans include the same features?",
    answer: "Yes. Annual plans include the same features as monthly plans, with two months of savings built into the annual price."
  },
  {
    question: "Is ListingJet only for real estate?",
    answer: "No. It works for real estate, hotels, venues, auto dealers, schools, jobs, products, and service businesses."
  }
];

const valueProps = [
  { Icon: ShieldCheck, title: "Professional trust", body: "Verified business signals, premium pages, and clear client-facing presentation." },
  { Icon: BarChart3, title: "Measurable visibility", body: "Views, leads, clicks, shares, sources, conversion rate, and top listing reports." },
  { Icon: FileText, title: "Owner-ready reports", body: "Shareable performance summaries that prove each listing is being marketed properly." }
];

export default function PricingPage() {
  const [cycle, setCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <div className={styles.page}>
      <PublicNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroInner}>
              <div className={styles.eyebrow}>
                <Sparkles className={styles.goldIcon} size={16} /> Pricing for modern listing teams
              </div>
              <h1 className={styles.heroTitle}>Simple plans for every stage of listing growth</h1>
              <p className={styles.heroCopy}>
                Start with premium campaign pages, then scale into team access, performance reporting, white-label tools, and API access as your operation grows.
              </p>
              <div className={styles.toggle}>
                <button
                  className={`${styles.toggleButton} ${cycle === "monthly" ? styles.toggleActive : ""}`}
                  onClick={() => setCycle("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`${styles.toggleButton} ${cycle === "annual" ? styles.toggleActive : ""}`}
                  onClick={() => setCycle("annual")}
                >
                  Annual
                </button>
              </div>
              <p className={styles.helperText}>Annual billing includes two months of savings.</p>
            </div>
          </div>
        </section>

        <section className={styles.plansSection}>
          <div className={styles.container}>
            <div className={styles.plansGrid}>
            {plans.map((plan) => {
              const price = cycle === "monthly" ? plan.monthly : plan.annual;
              return (
                <div
                  key={plan.id}
                  className={`${styles.planCard} ${plan.highlighted ? styles.planFeatured : ""}`}
                >
                  {plan.highlighted && (
                    <div className={styles.badge}>Most popular</div>
                  )}
                  <h2 className={styles.planName}>{plan.name}</h2>
                  <p className={styles.planDescription}>{plan.description}</p>
                  <div>
                    <p className={styles.price}>{price}</p>
                    <p className={styles.cycle}>/{cycle === "monthly" ? "month" : "year"}</p>
                    {cycle === "annual" && <p className={styles.savings}>{plan.annualNote}</p>}
                  </div>
                  <div className={styles.limit}>
                    <p>{plan.limit}</p>
                  </div>
                  <ul className={styles.featureList}>
                    {plan.features.map((feature) => (
                      <li key={feature} className={styles.featureItem}>
                        <Check className={styles.greenIcon} size={16} /> {feature}
                      </li>
                    ))}
                    {plan.unavailable.map((feature) => (
                      <li key={feature} className={styles.unavailableItem}>
                        <X size={16} /> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.planCta}>
                    <Link href={`/register?plan=${plan.id}&cycle=${cycle}`} className={`${styles.buttonLink} ${plan.highlighted ? styles.featuredButton : ""}`}>
                      Choose {plan.name}
                    </Link>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </section>

        <section className={styles.band}>
          <div className={styles.container}>
            <div className={styles.valueGrid}>
              {valueProps.map(({ Icon, title, body }) => (
                <div key={title} className={styles.valueCard}>
                  <div className={styles.iconBox}>
                    <Icon size={24} />
                  </div>
                  <h3 className={styles.valueTitle}>{title}</h3>
                  <p className={styles.valueBody}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>Compare plans</p>
              <h2 className={styles.sectionTitle}>What each plan includes</h2>
            </div>
            <div className={styles.paymentNote}>
              <CreditCard className={styles.greenIcon} size={16} /> Secure payments powered by Paystack
            </div>
          </div>
          <div className={styles.comparison}>
            <div className={styles.comparisonHead}>
              <div className={styles.comparisonCell}>Feature</div>
              <div className={styles.comparisonCell}>Starter</div>
              <div className={styles.comparisonCell}>Professional</div>
              <div className={styles.comparisonCell}>Enterprise</div>
            </div>
            {comparison.map(([feature, starter, professional, enterprise]) => (
              <div key={feature} className={styles.comparisonRow}>
                <div className={`${styles.comparisonCell} ${styles.featureName}`}>{feature}</div>
                <div className={styles.comparisonCell}>{starter}</div>
                <div className={styles.comparisonCell}>{professional}</div>
                <div className={styles.comparisonCell}>{enterprise}</div>
              </div>
            ))}
          </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
          <div className={styles.faqGrid}>
            <div>
              <p className={styles.kicker}>Questions</p>
              <h2 className={styles.sectionTitle} style={{ color: "#ffffff" }}>Pricing questions teams ask before launch</h2>
              <p className={styles.faqCopy}>Choose the plan that matches your current listing volume. Upgrade when your team, client reporting, or distribution needs grow.</p>
            </div>
            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <div key={faq.question} className={styles.faqCard}>
                  <div className={styles.faqQuestion}>
                    <HelpCircle className={styles.goldIcon} size={20} />
                    <h3>{faq.question}</h3>
                  </div>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.container}>
          <div className={styles.ctaBox}>
              <div>
                <div className={styles.eyebrow}>
                  <Users className={styles.greenIcon} size={16} /> Ready for a sharper listing operation
                </div>
                <h2 className={styles.ctaTitle}>Start with the plan that fits today. Scale when your campaigns do.</h2>
                <p className={styles.ctaCopy}>Create your workspace, publish your first listing campaign, and begin tracking every view, share, call, WhatsApp click, and lead.</p>
              </div>
              <Link href="/register" className={styles.primaryCta}>
                Start Growing Your Listings <ArrowRight size={16} />
              </Link>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
}
