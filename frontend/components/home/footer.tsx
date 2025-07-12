import { Zap, Twitter, Github, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Zap className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-2xl font-bold">Pepper Protocol</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The cross-chain protocol purpose-built for fan tokens. Trade,
              lend, and manage your fan tokens across chains with ease.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Pepper Protocol. All rights reserved. Built for sports fans,
            powered by cross-chain technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
