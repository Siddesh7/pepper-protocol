import { Heart, Zap, Users } from "lucide-react";

const WhyPepperSection = () => {
  const reasons = [
    {
      icon: Heart,
      title: "We care about UX",
      description:
        "Every interaction is designed to be intuitive, fast, and enjoyable for sports fans.",
    },
    {
      icon: Users,
      title: "We care about fans",
      description:
        "Built specifically for the sports community, not just generic DeFi traders.",
    },
    {
      icon: Zap,
      title: "Ready for the future",
      description:
        "Backed by cutting-edge cross-chain technology and prepared for the evolution of fan finance.",
    },
  ];

  return (
    <section
      id="why-pepper"
      className="py-16 bg-gradient-to-br from-blue-900 to-green-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🧠</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Pepper?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're building Pepper Protocol to remove the friction and let fans
            focus on what matters: being fans.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex p-6 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 group-hover:bg-white/20 transition-all duration-300">
                <reason.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
              <p className="text-blue-100 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Built for sports fans. Backed by cross-chain tech.
            </h3>
            <p className="text-blue-100 text-lg">
              Ready for the future of fan finance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { WhyPepperSection };
