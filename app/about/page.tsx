export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About 9jaAgents</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            9jaAgents is Nigeria's premier AI marketplace, connecting businesses with powerful automation solutions
            designed specifically for the African market.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-6">
            To democratize AI technology for Nigerian businesses by providing accessible, affordable, and culturally
            relevant AI agents that understand the unique challenges and opportunities in the African market.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Why Choose 9jaAgents?</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>AI agents designed specifically for Nigerian businesses</li>
            <li>Support for local languages (Yoruba, Hausa, Igbo)</li>
            <li>Integration with popular Nigerian payment systems</li>
            <li>Understanding of local business practices and regulations</li>
            <li>Affordable pricing in Naira currency</li>
            <li>24/7 customer support from Nigerian experts</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-6">
            Founded in 2024, 9jaAgents was born from the recognition that Nigerian businesses needed AI solutions that
            truly understood their context. Our team of Nigerian developers, data scientists, and business experts work
            tirelessly to create and curate AI agents that solve real problems for African businesses.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            Have questions or need support? Reach out to us at{" "}
            <a href="mailto:support@9jaagents.com" className="text-green-600 hover:underline">
              support@9jaagents.com
            </a>{" "}
            or call us at +234-800-9JA-AGENTS.
          </p>
        </div>
      </div>
    </div>
  )
}
