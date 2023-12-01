import type { Meta, StoryObj } from '@storybook/react';

import "@/styles/globals.css"

import { Button } from "../components/ui/button";

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      defaultValue: "default",
      control: "radio",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"] 
    },
    size: {
      defaultValue: "default",
      control: "radio",
      options: ["default", "sm", "lg", "icon"] 
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    label: "Button"
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Button"
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    label: "Button"
  },
};

export const Danger: Story = {
  args: {
    variant: "destructive",
    label: "Button"
  },
};
