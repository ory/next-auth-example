import CustomLink from "@/components/custom-link"

export default function Page() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Proxy usage</h1>
      <p>
        This page is protected by using the universal{" "}
        <CustomLink href="https://nextjs.authjs.dev#auth">
          <code>auth()</code>
        </CustomLink>{" "}
        method in{" "}
        <CustomLink href="https://nextjs.org/docs/app/building-your-application/routing/proxy">
          Next.js Proxy
        </CustomLink>
        .
      </p>
    </div>
  )
}
