import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Card, Button, Text, BlockStack } from "@shopify/polaris";
import Stepper from "./app.stepper";
import { authenticate } from "../shopify.server";

// Loader function to fetch shop URL dynamically
export async function loader({ request }) {
  try {
    const { session } = await authenticate.admin(request);

    if (!session || !session.shop) {
      console.error("Session or shop data missing");
      throw new Error("Shop data is missing in session.");
    }

    const { shop } = session;
    return json({ shop });

  } catch (error) {
    console.error("Loader Error:", error);
    throw new Response("Failed to load shop data", { status: 500 });
  }
}

export default function Step1() {
  const { shop } = useLoaderData();

  return (
    <>
      <Stepper />
      <Page title="Wishlist Setup - Step 1">
        <Card sectioned>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Enable the Customer UI Extension App
            </Text>

            <Text>
              Follow the steps below to activate the wishlist page on the My Account section.
            </Text>

            <Text>
              1. Navigate to <strong>Admin → Settings → Checkout → Customize</strong>.
              <br />
              2. In the <strong>App Embed</strong> section, click <strong>Add</strong> to include the Customer UI Full Page Extension and Customer UI Profile Block Extension.
              <br />
              3. Click <strong>Save</strong> to apply the changes.
            </Text>

            <Button url="/app/step5">Next Step</Button>
          </BlockStack>
        </Card>
      </Page>
    </>
  );
}
