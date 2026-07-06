import { Link } from "react-router-dom";
import { FiFacebook, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Seal from "../common/Seal";

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-cream/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Seal size={44} label="MSM" spin={false} />
            <span className="font-display text-cream text-lg">MASAIMI</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            A member-owned savings society helping working families in Bangladesh build disciplined, verified savings.
          </p>
        </div>
        <div>
          <h4 className="font-display text-cream mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold-light">Home</Link></li>
            <li><Link to="/members" className="hover:text-gold-light">Members</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-cream mb-4">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-gold-light">Member Login</Link></li>
            <li><Link to="/dashboard" className="hover:text-gold-light">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-cream mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><FiMapPin /> Mirpur, Dhaka, Bangladesh</li>
            <li className="flex items-center gap-2"><FiPhone /> +880 1XXX-XXXXXX</li>
            <li className="flex items-center gap-2"><FiMail /> info@masaimi.org</li>
            <li className="flex items-center gap-2"><FiFacebook /> facebook.com/masaimi</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-cream/40">
        <span>© {new Date().getFullYear()} MASAIMI Savings Society. All rights reserved.</span>
        <span>Building a Better Future Together</span>
      </div>
    </footer>
  );
}