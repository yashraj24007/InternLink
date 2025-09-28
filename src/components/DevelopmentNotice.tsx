import { motion } from "framer-motion";
import { Construction } from "lucide-react";

export const DevelopmentNotice = () => {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-3 px-4 font-medium flex items-center justify-center gap-2 fixed top-0 left-0 z-[60] shadow-lg"
    >
      <Construction className="w-4 h-4 animate-bounce" />
      <span className="text-sm md:text-base">
        🚧 This website is currently under development. Some features may not be fully functional.
      </span>
    </motion.div>
  );
};