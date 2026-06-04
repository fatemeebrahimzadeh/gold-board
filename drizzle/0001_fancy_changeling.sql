CREATE TABLE `ads` (
	`id` text PRIMARY KEY NOT NULL,
	`tenantId` text,
	`title` text NOT NULL,
	`mediaUrl` text NOT NULL,
	`duration` integer DEFAULT 5,
	`order` integer DEFAULT 0,
	FOREIGN KEY (`tenantId`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE no action
);
