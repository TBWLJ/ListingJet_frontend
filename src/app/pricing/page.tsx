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
    monthly: "₦15,000",
    annual: "₦150,000",
    annualNote: "Save ₦30,000 yearly",
    description: "For solo agents and small businesses starting with professional listing campaigns.",
    limit: "20 active listings",
    highlighted: false,
    features: ["Campaign pages", "Lead capture", "Analytics", "Marketing assets", "Multi-channel sharing"],
    unavailable: ["Campaign Scheduler", "Visibility Score", "Done-for-you services"]
  },
  {
    id: "growth",
    name: "Growth",
    monthly: "₦50,000",
    annual: "₦500,000",
    annualNote: "Save ₦100,000 yearly",
    description: "For growing Nigerian and African teams that need scheduling, insight, and consistency.",
    limit: "100 active listings",
    highlighted: true,
    features: ["Campaign Scheduler", "Marketing Asset Studio", "Advanced analytics", "Visibility Score", "Marketing Health Score", "Priority support"],
    unavailable: ["Monthly custom flyer design", "Video ad credits", "White-label platform"]
  },
  {
    id: "premium",
    name: "Premium",
    monthly: "₦100,000",
    annual: "₦1,000,000",
    annualNote: "Save ₦200,000 yearly",
    description: "For serious listing teams that want software plus creative support and boost credits.",
    limit: "500 active listings",
    highlighted: false,
    features: ["Everything in Growth", "Monthly custom flyer design", "Two promotional video ads monthly", "Campaign boost credits", "Priority distribution", "Premium support"],
    unavailable: ["White-label platform", "Dedicated marketing team"]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: "₦250,000",
    annual: "₦2,500,000",
    annualNote: "Save ₦500,000 yearly",
    description: "For platforms, agencies, franchises, and high-volume businesses that need custom scale.",
    limit: "Unlimited listings",
    highlighted: false,
    features: ["White-label platform", "Custom domain support", "Dedicated account manager", "Dedicated marketing team", "API access", "Custom integrations"],
    unavailable: []
  }
];

const comparison = [
  ["Active listings", "20", "100", "500", "Unlimited"],
  ["Campaign pages", "Included", "Included", "Included", "Included"],
  ["Lead capture", "Included", "Included", "Included", "Included"],
  ["Marketing assets", "Included", "Studio", "Studio + custom flyer", "Dedicated team"],
  ["Campaign Scheduler", "No", "Included", "Included", "Included"],
  ["Visibility Score", "No", "Included", "Included", "Included"],
  ["Marketing Health Score", "No", "Included", "Included", "Included"],
  ["Boost credits", "No", "No", "Included", "Custom"],
  ["White-label platform", "No", "No", "No", "Included"],
  ["API access", "No", "No", "No", "Included"]
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer: "Yes. You can upgrade as your listing volume, distribution needs, and client reporting requirements grow."
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
    answer: "No. It works for properties, hotels, venues, vehicles, jobs, services, products, and classified content across Nigeria and Africa."
  }
];

const valueProps = [
  { Icon: ShieldCheck, title: "Trust-first marketing", body: "Premium Canadian-style presentation built for Nigerian businesses that need to look credible online." },
  { Icon: BarChart3, title: "Visibility intelligence", body: "Visibility Score, Marketing Health Score, campaign reach, leads, clicks, and listing performance reports." },
  { Icon: FileText, title: "Creative output", body: "Marketing Asset Studio, custom flyer support, video ad credits, and done-for-you service pathways." }
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
              <h1 className={styles.heroTitle}>Pricing for Africa-first listing growth</h1>
              <p className={styles.heroCopy}>
                Start with campaign pages and lead capture, then scale into scheduling, asset creation, visibility scores, boost credits, and done-for-you marketing support.
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
              <CreditCard className={styles.greenIcon} size={16} /> Secure payments powered by Finswitz
            </div>
          </div>
          <div className={styles.comparison}>
            <div className={styles.comparisonHead}>
              <div className={styles.comparisonCell}>Feature</div>
              <div className={styles.comparisonCell}>Starter</div>
              <div className={styles.comparisonCell}>Growth</div>
              <div className={styles.comparisonCell}>Premium</div>
              <div className={styles.comparisonCell}>Enterprise</div>
            </div>
            {comparison.map(([feature, starter, growth, premium, enterprise]) => (
              <div key={feature} className={styles.comparisonRow}>
                <div className={`${styles.comparisonCell} ${styles.featureName}`}>{feature}</div>
                <div className={styles.comparisonCell}>{starter}</div>
                <div className={styles.comparisonCell}>{growth}</div>
                <div className={styles.comparisonCell}>{premium}</div>
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
              <p className={styles.faqCopy}>Choose the plan that matches your current listing volume. Upgrade when your scheduling, visibility, creative, or distribution needs grow.</p>
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
                <h2 className={styles.ctaTitle}>Start lean. Grow into a complete marketing operating system.</h2>
                <p className={styles.ctaCopy}>Create your workspace, publish your first listing campaign, generate marketing assets, and start building trusted lead pipelines.</p>
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
