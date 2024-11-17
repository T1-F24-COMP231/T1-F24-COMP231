// api.ts
export interface Website {
  id: number;
  userId: number;
  title: string;
  htmlContent: string;
  cssContent: string;
  javaScriptContent: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  publishedAt: string | null;
  deploymentUrl: string | null;
}

const API_URL = 'https://localhost:7226/Layout';

// Fetch websites for a specific user
export const fetchWebsites = async (userId: number): Promise<Website[]> => {
  const response = await fetch(`${API_URL}/User/${userId}`);
  console.log(response);
  if (!response.ok) {
    throw new Error('Error fetching websites.');
  }
  return response.json();
};

// Update website (publish/unpublish)
// api.ts
export const updateWebsite = async (
  websiteId: number,
  deploymentUrl: string | null
): Promise<void> => {
  const response = await fetch(`${API_URL}/${websiteId}/Publish`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deploymentUrl }),
  });
  if (!response.ok) {
    throw new Error('Error updating website.');
  }
};

// Delete a website
export const deleteWebsite = async (websiteId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${websiteId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting website.');
  }
};
