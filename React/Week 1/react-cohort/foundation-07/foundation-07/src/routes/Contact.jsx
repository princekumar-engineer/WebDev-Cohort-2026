import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Contact"!</div>
}
