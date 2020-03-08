# create delayed job table
class CreateDelayedJobs < ActiveRecord::Migration[5.1]
  def self.up
    create_table :delayed_jobs, force: true do |table|
      # Allows some jobs to jump to the front of the queue
      table.integer :priority, default: 0, null: false
      # Provides for retries, but still fail eventually.
      table.integer :attempts, default: 0, null: false
      # YAML-encoded string of the object that will do work
      table.longtext :handler,             null: false
      # reason for last failure (See Note below)
      table.longtext :last_error
      # When to run.
      table.datetime :run_at
      # Set when a client is working on this object
      table.datetime :locked_at
      # Set when all retries have failed ( by default, the record is deleted )
      table.datetime :failed_at
      # Who is working on this object (if locked)
      table.string :locked_by
      # The name of the queue this job is in
      table.string :queue
      table.integer :delayed_reference_id
      table.string  :delayed_reference_type
      table.timestamps null: true
    end

    add_index :delayed_jobs, %i[priority run_at],
              name: 'delayed_jobs_priority'
    add_index :delayed_jobs, [:queue],
              name: 'delayed_jobs_queue'
    add_index :delayed_jobs, [:delayed_reference_id],
              name: 'delayed_jobs_delayed_reference_id'
    add_index :delayed_jobs, [:delayed_reference_type],
              name: 'delayed_jobs_delayed_reference_type'
  end

  def self.down
    drop_table :delayed_jobs
  end
end
