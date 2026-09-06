import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Star, ArrowRight } from 'lucide-react';

interface ExamCardProps {
  icon: React.ReactNode;
  accentClass: string;
  code: string;
  fullName: string;
  description: string;
  stats: { label: string; value: string }[];
  href: string;
  delay: number;
}

function ExamCard({
  icon,
  accentClass,
  code,
  fullName,
  description,
  stats,
  href,
  delay,
}: ExamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <Link to={href} className="block group">
        <div className="card-dp p-7 flex flex-col gap-6 h-full">
          {/* Icon + code */}
          <div className="flex items-start justify-between">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${accentClass}`}
            >
              {icon}
            </div>
            <ArrowRight
              size={18}
              strokeWidth={2}
              className="text-dp-muted group-hover:text-[var(--color-accent-from)] group-hover:translate-x-1 transition-all mt-1"
            />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1">
            <h3 className="text-3xl font-black text-dp-primary tracking-tight">
              {code}
            </h3>
            <p className="text-xs font-semibold text-dp-muted uppercase tracking-widest">
              {fullName}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-dp-secondary leading-relaxed flex-1">
            {description}
          </p>

          {/* Stats */}
          <div className="flex gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex-1 bg-dp-bg border border-dp rounded-lg px-3 py-2.5 text-center"
              >
                <p className="text-xs font-bold text-dp-primary">{stat.value}</p>
                <p className="text-[10px] font-medium text-dp-muted mt-0.5 leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="btn-primary w-full justify-center text-sm font-bold">
            Explore {code}
            <ArrowRight size={15} strokeWidth={2.5} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ChooseExamSection() {
  return (
    <section className="w-full bg-dp-bg py-20 px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center flex flex-col gap-3"
        >
          <p className="text-xs font-bold text-[var(--color-accent-from)] uppercase tracking-widest">
            Your Path to Commission
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-dp-primary tracking-tight">
            Choose Your Mission
          </h2>
          <p className="text-dp-secondary text-base max-w-lg mx-auto leading-relaxed">
            Select your target exam and start preparing with real previous-year papers in a true exam environment.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ExamCard
            icon={<Shield size={26} strokeWidth={1.8} className="text-teal-500" />}
            accentClass="bg-teal-500/10 border border-teal-500/20"
            code="NDA"
            fullName="National Defence Academy"
            description="Joint service training institute exam conducted by UPSC twice a year for Army, Navy and Air Force. One of India's most prestigious defence entrance exams."
            stats={[
              { label: 'Papers per Exam', value: '2 Papers' },
              { label: 'Subjects', value: 'Maths + GAT' },
            ]}
            href="/nda"
            delay={0}
          />
          <ExamCard
            icon={<Star size={26} strokeWidth={1.8} className="text-blue-500" />}
            accentClass="bg-blue-500/10 border border-blue-500/20"
            code="CDS"
            fullName="Combined Defence Services"
            description="Recruitment to IMA, INA, AFA and OTA. Conducted by UPSC twice a year for graduate officers seeking commission across all three defence services."
            stats={[
              { label: 'Papers per Exam', value: '3 Papers' },
              { label: 'Subjects', value: 'Eng + GK + Math' },
            ]}
            href="/cds"
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}
