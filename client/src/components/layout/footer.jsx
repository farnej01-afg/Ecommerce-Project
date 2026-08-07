import { useCategories } from "@/hooks/useCategories";

export default function Footer() {
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <footer className="bg-[#111e2e] text-[#8a9cae] font-sans text-sm tracking-wide pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Column 1: Brand & Basic Links */}
        <div className="flex flex-col">
          <h3 className="text-white text-base font-semibold uppercase tracking-wider mb-8">
            BARATI CARPET
          </h3>

          {/* Logo Brand Area */}
          <div className="flex items-center gap-3 mb-8">
            {/* Ninova Side */}
            <div className="relative text-white text-3xl font-bold tracking-tighter leading-none">
              BARATI
              <span className="block text-right text-[11px] font-light mt-1 text-[#8a9cae] tracking-normal">
                carpet by
              </span>
              {/* Decorative Leaf Dot */}
              <span className="absolute top-0.5 left-8.75 w-2 h-2 bg-[#8cc63f] rounded-tl-full rounded-br-full rotate-45" />
            </div>

            {/* Fashion Side */}
            <div className="border-l border-[#334455] pl-3 flex flex-col justify-center leading-none">
              <span className="text-[#c5a880] font-serif text-xl font-bold tracking-wider">
                FASHION
              </span>
            </div>
          </div>

          {/* Links */}
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Collections 1 */}
        <div>
          <h3 className="text-white text-base font-semibold uppercase tracking-wider mb-8">
            Collections
          </h3>
          <ul className="space-y-3">
            {isLoading && <li className="text-xs opacity-60">Loading...</li>}
            {isError && <li className="text-xs opacity-60">Couldn't load</li>}
            {categories?.map((cat) => (
              <li key={cat.id ?? cat.name}>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h3 className="text-white text-base font-semibold uppercase tracking-wider mb-8">
            Contact Us
          </h3>
          <ul className="space-y-4.5">
            {/* Phone 1 */}
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.198 1.451 4.811 1.452 5.518 0 10.011-4.493 10.014-10.011.002-2.673-1.031-5.186-2.91-7.067-1.879-1.881-4.38-2.917-7.054-2.918-5.522 0-10.015 4.493-10.019 10.01-.001 1.693.443 3.344 1.284 4.793l-.999 3.647 3.73-.978zm11.205-3.033c.307.154.512.231.577.346.064.115.064.662-.154 1.277-.218.615-1.282 1.205-1.782 1.256-.474.049-.948.074-2.859-.684-2.235-.887-3.673-3.154-3.785-3.308-.115-.154-.936-1.243-.936-2.371 0-1.129.59-1.68.802-1.911.211-.231.461-.288.615-.288.154 0 .307.002.442.008.14.006.326-.053.512.397.192.461.654 1.596.711 1.711.057.115.096.25.019.404-.077.154-.154.25-.269.384-.115.135-.243.301-.346.404-.115.115-.237.243-.103.474.135.231.599.987 1.288 1.602.887.792 1.634 1.038 1.865 1.154.231.115.365.096.5-.058.135-.154.577-.673.731-.904.154-.231.307-.192.512-.115z" />
              </svg>
              <span>+93 78 854 4379</span>
            </li>
            {/* Phone 2 */}
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.198 1.451 4.811 1.452 5.518 0 10.011-4.493 10.014-10.011.002-2.673-1.031-5.186-2.91-7.067-1.879-1.881-4.38-2.917-7.054-2.918-5.522 0-10.015 4.493-10.019 10.01-.001 1.693.443 3.344 1.284 4.793l-.999 3.647 3.73-.978zm11.205-3.033c.307.154.512.231.577.346.064.115.064.662-.154 1.277-.218.615-1.282 1.205-1.782 1.256-.474.049-.948.074-2.859-.684-2.235-.887-3.673-3.154-3.785-3.308-.115-.154-.936-1.243-.936-2.371 0-1.129.59-1.68.802-1.911.211-.231.461-.288.615-.288.154 0 .307.002.442.008.14.006.326-.053.512.397.192.461.654 1.596.711 1.711.057.115.096.25.019.404-.077.154-.154.25-.269.384-.115.135-.243.301-.346.404-.115.115-.237.243-.103.474.135.231.599.987 1.288 1.602.887.792 1.634 1.038 1.865 1.154.231.115.365.096.5-.058.135-.154.577-.673.731-.904.154-.231.307-.192.512-.115z" />
              </svg>
              <span>+93 78 585 8419</span>
            </li>
            {/* Email */}
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Baraticarpets@gmail.com</span>
            </li>
            {/* Address */}
            <li className="flex items-start gap-3 leading-relaxed">
              <svg
                className="w-5 h-5 mt-1 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>
                Antique Forosha Lane (Shah Bobo Jan St), Shahr-e-Naw,
                District-2, Kabul, Afghanistan.
              </span>
            </li>
          </ul>

          {/* Social Icons Layout */}
          <div className="flex gap-6 mt-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1G6NXrGigo/?mibextid=wwXlfr"
              target="blank"
              className="hover:text-white transition-colors duration-200"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 27 27">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/baraticarpets?igsh=MTRwbTNlbm4yam5hbw%3D%3D&utum_source=qr"
              target="blank"
              className="hover:text-white transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Divider Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-[#1d2d40] text-center text-xs uppercase tracking-widest">
        © Copyright 2026 All rights reserved by BARATI CARPETS.
      </div>
    </footer>
  );
}
