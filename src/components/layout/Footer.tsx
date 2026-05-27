import Link from "next/link"
import { Scissors } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Scissors className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">StyleSlot</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Premium beauty and salon booking platform. Book your appointment
              with top stylists in your area.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-sm text-muted-foreground hover:text-primary">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-muted-foreground hover:text-primary">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Braiding</li>
              <li className="text-sm text-muted-foreground">Dreadlocks</li>
              <li className="text-sm text-muted-foreground">Haircuts</li>
              <li className="text-sm text-muted-foreground">Coloring</li>
              <li className="text-sm text-muted-foreground">Barbering</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-primary" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-primary" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-primary" aria-label="X (Twitter)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46L20 4"/></svg>
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              contact@styleslot.com
            </p>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} StyleSlot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
