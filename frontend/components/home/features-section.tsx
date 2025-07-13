import { Zap, DollarSign, BarChart3 } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "One-click cross-chain swaps",
      description:
        "Instantly swap from ETH/USDC on Base or Ethereum into fan tokens on Chiliz — no bridging headaches.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: DollarSign,
      title: "Cross-chain lending & borrowing",
      description:
        "Stake assets like ETH or USDC on your home chain and receive fan tokens on Chiliz to spend instantly.",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: BarChart3,
      title: "Unified Fan Token Portfolio",
      description:
        "View and manage all your fan tokens across chains — especially from Chiliz — in one simple dashboard.",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🚀</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to trade fan tokens seamlessly across chains
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { FeaturesSection };
