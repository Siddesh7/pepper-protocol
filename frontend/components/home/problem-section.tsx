import { AlertTriangle, Clock, Link } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: Clock,
      title: "Slow & Complex",
      description:
        "Multiple transactions and long wait times just to get the fan tokens you want",
    },
    {
      icon: Link,
      title: "Fragmented Experience",
      description:
        "Jumping between different chains, bridges, and protocols creates a confusing journey",
    },
    {
      icon: AlertTriangle,
      title: "Not Fan-Friendly",
      description:
        "Current DeFi tools are built for traders, not for sports fans who just want to support their team",
    },
  ];

  return (
    <section className="py-16 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Current State is Broken
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Today's cross-chain bridging and fan token trading experience is a
            maze of complexity that keeps fans away from what they love.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-red-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <problem.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4">
                  {problem.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProblemSection };
