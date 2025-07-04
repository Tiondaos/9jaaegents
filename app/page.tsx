import { Hero } from "../components/sections/hero"
import { FeaturedAgents } from "../components/sections/featured-agents"
import { Categories } from "../components/sections/categories"
import { Stats } from "../components/sections/stats"
import { Testimonials } from "../components/sections/testimonials"
import { Newsletter } from "../components/sections/newsletter"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <FeaturedAgents />
      <Categories />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
