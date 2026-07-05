import { site } from "@/lib/site";
import { GitHubIcon, InstagramIcon, MailIcon } from "./icons";

const links = [
  { href: site.socials.github, label: "GitHub", Icon: GitHubIcon, external: true },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon, external: true },
  { href: `mailto:${site.email}`, label: "Email", Icon: MailIcon, external: false },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {site.name} — {site.role}
        </p>
        <div className="flex gap-5">
          {links.map(({ href, label, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-muted transition-colors hover:text-fg"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
