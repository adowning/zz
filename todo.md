<content>
# Frontend Refactoring Todo List

## 1. Refactor State Management for a Clearer Data Flow
   - **1.1** Eliminate `useGlobalStore`: Migrate its state to the appropriate domain stores (e.g., user data to authStore, wallet data to transactionStore).
   - **1.2** Centralize Data Fetching in Stores: Each store should be responsible for its own data. For example, gameStore should have an action to fetch games, and gameSpinStore should fetch top wins.
   - **1.3** Orchestrate Actions from Views: Components like App.vue or login.vue should only call actions from these stores (e.g., authStore.login(), then gameStore.fetchAllGames()). They should not contain data-fetching logic themselves.
   - **1.4** Refactor the `login` Action: The authStore.login action should only handle authentication and setting the user/token state. Subsequent data fetching for other parts of the app should be triggered from the view layer after a successful login.

## 2. Refactor GameCarousel.vue by Extracting Logic and Adhering to Vue Best Practices
   - **2.1** Extract Logic to Composables: The custom scrollbar logic (including pointer event handling) is a perfect candidate for a useCustomScrollbar composable. The image preloading and state management is already well-handled in useGameImageLoader, which is great.
   - **2.2** Move Data Logic to the Store: The logic for managing "fast local games" and deduplication should be moved into the game.store.ts. The component should receive a clean, ready-to-render list of games from the store.
   - **2.3** Use Template Refs: Replace all instances of document.querySelectorAll with Vue's ref attributes for safer and more idiomatic DOM interaction.

## 3. Consolidate all API requests through a single, configured client instance
   - **3.1** Configure Orval: Update the orval.config.ts to ensure the generated client uses a single, shared axle instance. This guarantees all requests go through the same middleware.
   - **3.2** Centralize Interceptors: The token-injection and 401-refresh logic, currently implemented in auth.store.ts, should be moved into the interceptors of the shared axle client. This makes the auth logic truly global for all API calls.
   - **3.3** Remove Redundant Code: Deprecate and remove the standalone customFetch function and any other legacy API helpers in src/apis if they are no longer needed, ensuring the orval-generated client is the single standard.

## 4. Implement a more dynamic and performant asset loading strategy
   - **4.1** Asynchronously Load Animation Data: Modify the SpriteAnimator component to accept a URL to the animation JSON file instead of the imported JSON object. The component can then use the fetch API to load this data on-demand when it's about to be rendered. This will remove the large JSON files from the main bundle.
   - **4.2** Dynamic Content for Carousels: The list of images for the AdCarousel.vue should be fetched from an API or a Pinia store. This makes the content dynamic and manageable without requiring a code change and redeployment for every ad update.
   - **4.3** Image Optimization: Ensure all images are optimized for the web (e.g., using formats like WebP or AVIF, which I see you are already using in some places) and are appropriately sized for their containers to reduce bandwidth and improve load times.

## 5. Centralize all authentication-related routing logic within Vue Router's navigation guards
   - **5.1** Remove Auth Logic from `App.vue`: The onMounted hook in App.vue should be simplified. Its responsibility for checking authentication and redirecting should be removed.
   - **5.2** Enhance `router.beforeEach`: The navigation guard in src/router/index.ts should be the single source of truth for protecting routes. It should check for a valid token and user session before allowing navigation to a protected route. If the user is not authenticated, it should redirect to /login. This prevents protected components from ever mounting unnecessarily.
   - **5.3** Use `authReady` Flag: The authStore has an authReady flag. The navigation guard should wait for this flag to be true before processing any routes. This ensures that the initial silent token refresh has completed and the user's authentication status is known.

## 6. Enforce stricter code quality and typing standards
   - **6.1** Extract Utility Functions: Move pure utility functions out of components and into dedicated files in the src/lib or src/utils directory. This improves reusability, testability, and component readability.
   - **6.2** Use Enums or Consts for Events: For the useEventManager, define event names as an enum or a const object. This will provide type safety and autocompletion when emitting or listening for events, preventing hard-to-debug typos.
   - **6.3** Leverage Generated Types: Use the orval-generated types from src/gen/models to strongly type your Pinia store state. For example, instead of depositSubmit: ref<any>({}), use the specific type generated for that API response. This will improve type safety throughout the application.

## 7. Make the event bus more generic and predictable by removing this special logic
   - **7.1** Explicit Event Emission: The component that triggers an overlay to open should be responsible for emitting all necessary events. For example, the button in Footer.vue that opens the shop should emit both shopOpen and hideBars events.
   - **7.2** Alternative: Use a Layout Store: A more robust solution is to create a useLayoutStore with Pinia. This store would hold boolean states like isShopOpen or isWheelOpen. The home.vue component could then have a computed property, such as shouldShowBars, that reactively determines its visibility based on the state of these modals. This contains UI state logic within a dedicated store, making it easier to manage and trace.

## 8. Leverage modern CSS for more fluid and maintainable layouts
   - **8.1** Use CSS Scroll Snap: In GameCarousel.vue, replace the JavaScript-based scroll calculations with CSS Scroll Snap properties. This provides a smoother, more native-feeling scroll experience and offloads the layout work to the browser, which is more performant and reliable.
   - **8.2** Embrace Utility-First CSS: The project already uses Tailwind CSS. Use it more consistently to replace inline styles for padding, margins, widths, and flexbox properties. This will make component templates cleaner and ensure a consistent design system. For example, style="min-width: 120px" can be replaced with a Tailwind class like w-30.
   - **8.3** Consolidate Global Styles: The vip.css file contains a large number of global styles and resets. These should be integrated into the main entry CSS file (src/styles/common.css) to ensure a single, predictable cascade for base styles.

## 9. Centralize the API client configuration and decouple store initializations
   - **9.1** Configure the API Client Once: Create a single file (e.g., src/request/client.ts) that exports a pre-configured axle instance. This file should be the only place where the baseURL and interceptors are defined. The interceptors should be added only once when the application starts. The request interceptor can dynamically get the latest token from the authStore when a request is made.
   - **9.2** Decouple Store Initialization: The authStore.init function should only be responsible for establishing the authentication state (checking for a token and fetching the user profile). A higher-level bootstrap process, likely in main.ts or the root App.vue, should then be responsible for calling the respective fetch actions on other stores (gameStore, vipStore, etc.) once authentication is confirmed.
</content>